import { ReactNode, Dispatch, SetStateAction, useRef } from "react";
import { motion } from "framer-motion";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

type DialogProps = {
	title: string;
	children: ReactNode | ReactNode[];
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const Dialog = (props: DialogProps) => {
	const { title, children, isVisible, setIsVisible } = props;
	const dialogRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(dialogRef, () => setIsVisible(false));
	return isVisible ? (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
			ref={dialogRef}
			className={`absolute top-full right-0 my-2 py-4 px-6 rounded bg-slate-800 opacity-70 text-amber-50 z-50 max-h-60 overflow-y-scroll shadow-2xl shadow-inner"
			}`}
		>
			<p>{title}</p>
			<div className='w-full bg-slate-700 h-[2px] mt-2 mb-4 '></div>
			{children}
		</motion.div>
	) : null;
};

export default Dialog;
