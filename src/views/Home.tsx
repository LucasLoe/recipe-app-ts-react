import ViewLayout from "../components/layouts/ViewLayout";

type RecipeTitleProps = {
	title: string;
};

type RecipeShortInformationProps = {
	price: number;
	duration: number;
	additionalInformation: string[];
};
const RecipeTitle = (props: RecipeTitleProps) => {
	return <h2 className='text-xl font-thin my-1 '>{props.title}</h2>;
};

const RecipeShortInformation = (props: RecipeShortInformationProps) => {
	return (
		<div className=' w-full my-1 flex flex-row justify-between items-center'>
			<p className='text-sm'>{`${props.duration} min`}</p>
			<div>
				{props.additionalInformation &&
					props.additionalInformation.map((elem, idx) => {
						return (
							<span key={idx} className='mx-1 font-thin text-sm'>
								{elem}
							</span>
						);
					})}
			</div>
			<p className='text-sm'>{`${props.price} €`}</p>
		</div>
	);
};

const Home = () => {
	return (
		<>
			<ViewLayout>
				<div className='relative w-full h-full text-amber-50'>
					<img src='./src/assets/example1.jpg' className='w-full h-full object-cover'></img>
					<div className='absolute bg-slate-800 top-[70%] w-full h-[30%] opacity-80 px-4 py-2 flex flex-col justify-between'>
						<RecipeTitle title='super duper leckeres Rezept mit langem Namen' />
						<RecipeShortInformation
							price={23.32}
							duration={12}
							additionalInformation={["vegan", "info 2"]}
						/>
					</div>
				</div>
			</ViewLayout>
		</>
	);
};

export default Home;
