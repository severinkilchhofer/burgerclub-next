import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black w-full py-12 px-4 mt-16">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-left inline-block text-gray-100">All rights reserved.</span>
                <div>
                    <a href="https://github.com/severinkilchhofer/burgerclub-next" target="_blank"
                       className="text-right text-gray-100 cursor-pointer">Github →</a><br/>
                    <Link href="/upload"><a className="text-gray-100"> Bilder hochladen → </a></Link>
                </div>
            </div>
        </footer>
    )
}