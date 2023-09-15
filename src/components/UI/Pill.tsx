type PillProps = {
	label: string;
	isSelected: boolean;
	setIsSelected: Function;
};

const Pill = (props: PillProps) => {
	const { label, isSelected, setIsSelected } = props;

	return (
		<div
			onClick={() => setIsSelected()}
			className={`px-2 py-0.5 text-sm rounded-full w-fit ${
				isSelected
					? "bg-amber-50 outline outline-2 outline-amber-50 text-slate-700 shadow-xl"
					: "bg-none outline-2 outline-amber-50 outline-dotted"
			}`}
		>
			{label}
		</div>
	);
};

export default Pill;
