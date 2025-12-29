import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Sample Login</h1>
            <Link href="/login">Go to Login</Link>
        </div>
    );
};

export default HomePage;