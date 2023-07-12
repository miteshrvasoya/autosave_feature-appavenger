export default function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base 36
    const randomString = Math.random().toString(36).substr(2, 13); // Generate a random string of length 13
    const uniqueId = timestamp + randomString;

    return uniqueId.substr(0, 15); // Take the first 15 characters of the generated ID
}