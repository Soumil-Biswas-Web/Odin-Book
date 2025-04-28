import { Router } from "express";
import upload from "../middleware/multerUploader.js";
import prisma from "../middleware/prismaInit.js";
import { uploadToCloudinary } from "../middleware/cloudinaryInit.js";
import { authenticateRequest } from "../middleware/authMiddleware.js";
import selectUserInfo from "../middleware/selectuserInfo.js";

const route = Router();

// get feed 
route.get('/feed', async (req, res) => {
    try {
        const feed = await prisma.obook_Post.findMany({
            include: {
                user: {
                    select: selectUserInfo,
                },
                image: true,
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            }
        });

        // console.log("Feed:");
        // console.log(feed);

        if (feed.length === 0) {
            return res.status(400).json({message: 'Feed not found'});
        }

        res.json(feed);

    } catch (error) {
      console.error('Error fetching feed:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

// get post
route.get('/post', async (req, res) => {
    try {
        const {postId} = req.query;
        console.log(postId);

        const post = await prisma.obook_Post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: {
                    select: selectUserInfo,
                },
                image: true,
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                },                
                comments: {
                    include: {
                        user: {
                            select: selectUserInfo,
                        },
                        _count: {
                            select: {
                                likes: true,
                                comments: true
                            }
                        }, 
                    }                    
                }
            }
        });

        // console.log("post:");
        // console.log(post);

        if (!post) {
            return res.status(400).json({message: 'Post not found'});
        }

        res.json(post);

    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

// post newPost
route.post('/newPost', authenticateRequest, upload.single('file'), async (req, res) => {
    try {
        // console.log(req);
        const {userId, text} = req.body;
        const file = req.file;
        // console.log(userId);
        console.log(file);

        // Upload file to Coudinary
        const result = await uploadToCloudinary(file);
        console.log(result);

        await prisma.obook_Post.create({
            data: {
                userId,
                text,
                ...(file && { 
                    image: {
                        create: {
                            name: result.original_filename,
                            url: result.secure_url,
                            size: result.bytes,
                            publicId: result.public_id,
                        },
                    }
                }),
            }
        })

        res.status(201).json({message:'Post created successfully'});
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

// Edit post
route.put('/editPost', authenticateRequest, upload.single('file'), async (req, res) => {
    try {
        const {postId, userId, text} = req.body;
        const file = req.file;

        let result;
        if (file) {
            // Upload file to Coudinary
            result = await uploadToCloudinary(file);
            console.log(result);
        }        

        const post = await prisma.obook_Post.findUnique({ where: { id: postId } });

        if (!post) return res.status(404).json({ message: 'Post not found' });
        
        if (post.userId !== userId) return res.status(403).json({message: 'Unauthorized editor >:['});

        const prismaResult = await prisma.obook_Post.update({
            where: {id: postId},
            data: {
                text,
                ...(file && { 
                    image: {
                        update: {
                            name: result.original_filename,
                            url: result.secure_url,
                            size: result.bytes,
                            publicId: result.public_id,
                        },
                    }                    
                }),
            }
        })

        if (!prismaResult) {
            return res.status(400).json({message: 'Post not found'});
        }

        res.status(201).json({message:'Post edited successfully'});
    } catch (error) {
      console.error('Error editing post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

// Delete Post
route.delete('/delete', authenticateRequest, async (req, res) => {
    try {
        const {postId} = req.query;
        console.log(postId);

        const result = await prisma.obook_Post.delete({where: {id: postId}});

        if (!result) {
            return res.status(400).json({message: 'Post not found'});
        }

        res.status(201).json({message:'Post deleted successfully'});
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
})

// Add comment to post
route.post('/comment', authenticateRequest, upload.none(), async (req, res) => {
    try {
        const {postId, userId, text} = req.body;

        const result = await prisma.obook_Post.update({
            where: {id: postId},
            data: {
                comments: {
                    create: {
                        userId,
                        text,
                    }
                },
            }
        });

        if (!result) {
            return res.status(400).json({message: 'Post not found'});
        }        

        res.status(201).json({message:'Comment added successfully'});
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
})


export default route;