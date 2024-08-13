import { gridItems } from "@/data/index";
import { cn } from "@/lib/utils";
import { GlobeDemo } from "./Gridglobe";


export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-rows-10 lg:grid-rows-9 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  website,
  hoverEffect = true,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  website?: string;
  hoverEffect?: boolean;
}) => {

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        backgroundColor: "rgb(4,7,29)",
        background: img ? "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)" : "rgb(4,7,29)",
      }}
    >
      <a className="h-full" href={website}>


        {img && (
          <div
            className={cn("absolute inset-0 bg-cover bg-center opacity-50", imgClassName)}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        )}
        <div className={`h-full relative z-10`}>
          <div
            className={`transition duration-200 relative md:h-full min-h-40 flex flex-col justify-end px-5 p-3 lg:p-6
              ${hoverEffect ? 'group-hover/bento:translate-x-2' : ''
              }`}
          >
            {id === 7 ? (
              <>
                <div className={cn(titleClassName, `text-lg md:text-2xl lg:text-3xl font-bold`)}>
                  {title}
                </div>
                <GlobeDemo />
              </>
            ) : (
              <>
                <div className="font-light md:text-xs lg:text-base text-sm text-[#C1C2D3] text-right">
                  {description}
                </div>
                <div className={cn(titleClassName, `text-lg md:text-2xl lg:text-3xl font-bold text-right`)}>
                  {title}
                </div>
              </>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};