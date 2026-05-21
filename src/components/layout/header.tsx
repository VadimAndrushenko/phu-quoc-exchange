import ButtonWell from "../ui/ButtonWell";
import Logo from "../ui/Logo";
import ButtonContact from './../ui/ButtonContact';


export default function Header() {
    return (
        <header
        className="
            sticky top-0 z-50

            bg-black/10
            backdrop-blur-md

            border-b border-white/5

            shadow-[0_4px_20px_rgba(0,0,0,0.12)]

            transition-all duration-500

            

    "
>
    <div className="h-23.5 flex justify-between items-center container max-[480px]:h-17.5">
        <Logo />

        <div className="flex items-center gap-5 max-lg:gap-2">
            <ButtonWell />
            <ButtonContact />
        </div>
    </div>
</header>
    );
}