export default function isFollowing(user, contact) {
    // console.log(user);
    // console.log(contact);
    const result = contact.following.some(({ userId }) => userId === user.id);
    // console.log(result);
    return result;
}