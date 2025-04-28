import { Router, text } from "express";
import upload from "../middleware/multerUploader.js";
import prisma from "../middleware/prismaInit.js";
import { uploadToCloudinary } from "../middleware/cloudinaryInit.js";
import { authenticateRequest } from "../middleware/authMiddleware.js";
import { TbUserEdit } from "react-icons/tb";
import selectUserInfo from "../middleware/selectuserInfo.js";

const route = Router();

// get all users
route.get('/all', async (req, res) => {

    try {
        const users = await prisma.obook_User.findMany({
            select: selectUserInfo,
        });

        // console.log("users:");
        // console.log(users);

        if (users.length === 0) {
            return res.status(400).json({message: 'Users not found'});
        }

        res.json(users);

    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

// get followers 
route.get('/followers', authenticateRequest, async (req, res) => {
    const {id} = req.user;

    try {
        const followers = await prisma.obook_User.findUnique({
            where: {id},
            select: {
                id: true,
                username: true,
                follows: {
                    select: {
                        users: true,
                    }
                },
                following: {
                    select: {
                        users: true,
                    }
                }
            }
        });

        // console.log("followers:");
        // console.log(followers);

        if (followers.length === 0) {
            return res.status(400).json({message: 'Followers not found'});
        }

        res.json(followers);

    } catch (error) {
      console.error('Error fetching followers:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

// follow a user
route.post('/follow', authenticateRequest, async (req, res) => {

    const {followId} = req.body
    const {id} = req.user

    try {
        await prisma.obook_UserFollow.create({
            data: {
                userId: id,
                followId,
            }
        });

        res.status(200).json({message: 'Followed user successfully'});

    } catch (error) {
      console.error('Error following users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

// fetch a particular profile/ user
route.get('/profile', async (req, res) => {
    
    console.log(req.query);
    const {id} = req.query

    try {
        const user = await prisma.obook_User.findUnique({
            where: {id},
            include: {
                profilePicture: true,
                posts: {
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
                },
                comments: true,
                follows: true,
                following: true,
                likedPosts: true,
                likedComments: true,
            }
        });

        // console.log("user:");
        // console.log(user);

        if (user.length === 0) {
            return res.status(400).json({message: 'User not found'});
        }

        res.json(user);        

    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

route.post('/picture', authenticateRequest, upload.single('file'), async (req, res) => {
    try {
        // console.log(req);
        const { username } = req.user;
        const file = req.file;

        // Upload file to Coudinary
        const couldinaryResult = await uploadToCloudinary(file);
        console.log(couldinaryResult);
        
        const result = await prisma.obook_User.update({
            where: {username},
            data: {
                profilePicture: {
                    upsert: {
                        update: {
                          name: couldinaryResult.original_filename,
                          url: couldinaryResult.secure_url,
                          size: couldinaryResult.bytes,
                          publicId: couldinaryResult.public_id,
                        },
                        create: {
                          name: couldinaryResult.original_filename,
                          url: couldinaryResult.secure_url,
                          size: couldinaryResult.bytes,
                          publicId: couldinaryResult.public_id,
                        },
                    }
                }
            }
        })

        if (!result) {
            return res.status(400).json({message: 'Profile not found'});
        }

        res.status(201).json({message:'Profile edited successfully'});
    } catch (error) {
      console.error('Error editing profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }   
});

export default route;