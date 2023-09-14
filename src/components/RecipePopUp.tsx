import { AnimatePresence, motion } from "framer-motion";
import { RecipeFromApi } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

type RecipePopUpProps = {
	activeRecipe: RecipeFromApi | null;
	setActiveRecipe: React.Dispatch<React.SetStateAction<RecipeFromApi | null>>;
};

type RowProps = {
	children: ReactNode | ReactNode[];
};

type SubheadingProps = {
	label: string;
};

const Row = (props: RowProps) => {
	if (!props.children) return;
	return Array.isArray(props.children) ? (
		<div className='w-full pl-4 font-light flex flex-row justify-start my-2 text-lg'>
			{props.children}
		</div>
	) : (
		<div className='w-full pl-4 font-light flex flex-row justify-start my-2 text-lg'>
			{props.children}
		</div>
	);
};

const Subheading = (props: SubheadingProps) => {
	return (
		<>
			<h3 className='mt-6 mb-1 font-thin text-2xl'>{props.label}</h3>
			<div className='bg-amber-50 w-[90%] h-0.5'></div>
		</>
	);
};

const RecipePopUp = (props: RecipePopUpProps) => {
	const windowRef = useRef<HTMLDivElement>(null);
	const { activeRecipe, setActiveRecipe } = props;
	useOnClickOutside(windowRef, () => props.setActiveRecipe(null));

	return (
		<AnimatePresence>
			{activeRecipe && (
				<motion.div
					ref={windowRef}
					className='absolute my-2 box-border w-[90%] h-[80%] bg-slate-700 z-50 rounded p-4 bg-opacity-90 text-amber-50 overflow-y-scroll'
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
				>
					<div className='mr-0 outline outline-1 outline-amber-50 my-4 p-0 mx-auto bg-slate-700 shadow-xl w-8 h-8 rounded flex flex-row justify-center items-center'>
						<FontAwesomeIcon
							className='text-amber-50 w-4 h-4'
							icon={faX}
							onClick={() => setActiveRecipe(null)}
						/>
					</div>
					<img
						className=' w-full h-60 object-cover rounded'
						src={activeRecipe?.images?.LARGE?.url || activeRecipe?.images?.REGULAR?.url}
					/>
					<h1 className='text-3xl my-4 tracking-wide'>{activeRecipe.label}</h1>
					<Subheading label='Metadata' />
					<Row>
						<p className='mr-2'>Calories:</p>
						<p>
							{activeRecipe.yield != 0
								? Math.round(activeRecipe.calories / activeRecipe.yield)
								: Math.round(activeRecipe.calories)}
							{" kcal"}
						</p>
					</Row>
					<Row>
						<p className='mr-2'>Labels:</p>
						<div>
							{activeRecipe.cautions.length != 0
								? activeRecipe.cautions.map((elem, idx) => {
										return <p key={idx}>{elem}</p>;
								  })
								: null}
						</div>
					</Row>
					{activeRecipe.ingredientLines ? (
						<>
							<Subheading
								label={`Ingredients (${activeRecipe.yield != 0 ? activeRecipe.yield : 1} servings)`}
							/>
							<Row>
								<div>
									{activeRecipe.ingredientLines.map((ingredient, idx) => {
										return (
											<p className='mb-2 font-light' key={idx}>
												<FontAwesomeIcon
													className='text-amber-50 bg-transparent mr-2'
													icon={faMinus}
												/>
												{ingredient}
											</p>
										);
									})}
								</div>
							</Row>
						</>
					) : null}
					<Subheading label='Instructions' />
					<Row>
						<a href={activeRecipe.url} target='_blank'>
							Click here for the recipe instructions
						</a>
					</Row>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default RecipePopUp;
