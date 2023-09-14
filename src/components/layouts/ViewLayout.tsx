import TopNavBar from "../TopNavBar";

type ViewLayout = {
	children: React.ReactNode;
};

const ViewLayout = (props: ViewLayout) => {
	return (
		<div className='w-full h-full outline outline-2 outline-amber-50 overflow-y-scroll bg-slate-800'>
			<TopNavBar />
			<div id='view-inner-container' className='w-full h-[90vh] relative'>
				{props.children}
			</div>
		</div>
	);
};

export default ViewLayout;
