import { AnimatePresence, motion } from "framer-motion";
import { RecipeFromApi } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type RecipePopUpProps = {
	activeRecipe: RecipeFromApi | null;
	setActiveRecipe: React.Dispatch<React.SetStateAction<RecipeFromApi | null>>;
};

type RowProps = {
	children: ReactNode | ReactNode[];
};

const Row = (props: RowProps) => {
	return <div className='w-full flex flex-row justify-between my-4'>{props.children}</div>;
};

const RecipePopUp = (props: RecipePopUpProps) => {
	return (
		<AnimatePresence>
			{props.activeRecipe && (
				<motion.div
					className='absolute box-border w-[80%] h-[80%] bg-slate-800 z-50 rounded p-4 bg-opacity-90 text-amber-50'
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
				>
					<div className='mr-0 mx-auto bg-slate-700 shadow-xl w-8 h-8 rounded flex flex-row justify-center items-center'>
						<FontAwesomeIcon
							className='text-amber-50 w-4 h-4'
							icon={faX}
							onClick={() => props.setActiveRecipe(null)}
						/>
					</div>
					<Row>
						<img
							className=' w-full h-48 object-cover rounded'
							src={
								props.activeRecipe?.images?.LARGE?.url || props.activeRecipe?.images?.REGULAR?.url
							}
						/>
					</Row>
					<Row>
						<h1 className='text-4xl font-thin tracking-wide'>{props.activeRecipe.label}</h1>
					</Row>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default RecipePopUp;
