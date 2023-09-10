import { useView } from "../contexts/ViewContext";
import { GlobalViewKeys } from "../types";

type ClickeableProps = {
	children: GlobalViewKeys;
	active: boolean;
	setActive: Function;
};

const Clickeable = (props: ClickeableProps) => {
	return (
		<div
			onClick={() => props.setActive()}
			className={`cursor-pointer grow font-semibold text-md text-amber-50 hover:bg-slate-600 px-2 py-1 flex justify-center items-center text-center ${
				props.active && "bg-red-900"
			}`}
		>
			{props.children}
		</div>
	);
};

const TopNavBar = () => {
	const { currentGlobalView, setCurrentGlobalView } = useView();
	return (
		<div className='w-full h-[10vh] flex flex-row justify-evenly'>
			{Object.values(GlobalViewKeys).map((name, key) => {
				return (
					<Clickeable
						key={name + key}
						active={name === currentGlobalView}
						setActive={() => setCurrentGlobalView(name)}
					>
						{name}
					</Clickeable>
				);
			})}
		</div>
	);
};

export default TopNavBar;
