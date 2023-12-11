import Image from "next/image"

export const Logo = () => {
    return (
        <div className="flex items-center justify-center h-16">
            <Image src="/ipahaLogo.png" width={130} height={130} alt="Logo" />
        </div>
        
    )
}   

export default Logo;