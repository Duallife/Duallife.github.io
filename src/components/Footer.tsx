import { FaLocationArrow } from "react-icons/fa6";

import { generalData } from "@/data/general";

const Footer = () => {
    return (
        <footer className="w-full pb-10" id="footer">
            {/* <div className="flex flex-col items-center">
                <h1 className="heading lg:max-w-[45vw]">
                    Ready to take <span className="text-purple">your</span> digital
                    presence to the next level?
                </h1>
                <p className="text-white-200 md:mt-10 my-5 text-center">
                    Reach out to me today and let&apos;s discuss how I can help you
                    achieve your goals.
                </p>
            </div> */}
            <div className="flex mt-10 md:flex-row flex-col items-center justify-end w-full">
                <p className="text-neutral-400 text-end items-end justify-end md:text-base text-sm md:font-normal font-light">
                    Copyright © 2025 Ricky Tse
                </p>
            </div>
        </footer>
    );
};

export default Footer;