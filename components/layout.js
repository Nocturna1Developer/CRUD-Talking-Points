import Nav from './Nav'; // just created in Nav.js

// Home page, dashboard, edit page goes here, imports props to always display layout
// The Layout is a "layout tag"
export default function Layout({ children }) {
    return (
        <div className="mx-6 md:max-w-2x1 md:mx-auto font-poppins">
            <Nav />
            <main>{children}</main>
        </div>
    );
}