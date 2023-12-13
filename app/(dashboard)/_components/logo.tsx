import Image from "next/image"

export const Logo = () => {
    return (
        <div className="flex items-center justify-center h-16">
            <Image src="/iPahaStudyLogo1.png" width={180} height={130} alt="Logo" />
        </div>
        
    )
}   

export default Logo;