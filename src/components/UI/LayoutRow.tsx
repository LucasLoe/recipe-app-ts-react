import { ReactNode } from "react";

type LayoutRowProps = {
	label?: string;
	children: ReactNode | ReactNode[];
};

const LayoutRow = (props: LayoutRowProps) => {
	return (
		<>
			{props.label && <label className='text-amber-50 text-sm text-left'>{props.label}</label>}
			<div className='w-full flex flex-row justify-between my-2 items-center gap-8'>
				{props.children}
			</div>
		</>
	);
};

export default LayoutRow;
