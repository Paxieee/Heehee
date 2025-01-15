import jwt from 'jsonwebtoken';

const generateToken = (res,userId) => {
    const token = jwt.sign({ userId }, process.env.
        JWT_SECRET, {expiresIn: '50d'}
    );
    
    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        masAge: 50 * 24 * 360 * 1000 // 50 days
    });
}

export default generateToken ;

