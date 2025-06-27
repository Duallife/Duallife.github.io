import { FaLocationArrow } from "react-icons/fa6";
import { generalDataCN } from "@/data/general_cn";

const FooterCN = () => {
    return (
        <footer className="w-full pb-10" id="footer">
            <div className="flex mt-10 md:flex-row flex-col items-center justify-end w-full">
                <p className="text-neutral-400 text-end items-end justify-end md:text-base text-sm md:font-normal font-light">
                    版权所有 © 2025 谢睿楷
                </p>
            </div>
        </footer>
    );
};

export default FooterCN; 