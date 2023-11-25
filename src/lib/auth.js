import { jwtVerify } from "jose";

export const isAdminAuthenticated = (req) => new Promise(async (resolve) => {

    const cookie = req.cookies.get('medicare_admin');
    const SECRET_KEY = process.env.SECRET_KEY;

    // cookie is null or undefined 
    if (!cookie) {
        resolve(null);
    }

    try {
        const token = cookie.value;

        const key = new TextEncoder().encode(SECRET_KEY);
        const jwt = await jwtVerify(token, key);

        if (jwt) {
            const { exp, payload } = jwt;
            if (Date.now() > exp) {
                resolve(null);
            }
            delete payload.id;
            resolve(payload);
        } else {
            resolve(null);
        }

    } catch (err) {
        resolve(null);
    }
});

export const useAuth = async (token) => {
    try {

        // const SECRET_KEY = process.env.SECRET_KEY;
        // const key = new TextEncoder().encode(SECRET_KEY);
        // const jwt = await jwtVerify(token, key);

        // console.log(jwt);

        // if (jwt) {
        //     const { exp, payload } = jwt;
        //     if (Date.now() > exp) {
        //         return null;
        //     }

        //     delete payload.id;
        //     return payload;
        // } else {
        //     return null;
        // }

    } catch (err) {
        throw err;
    }
}