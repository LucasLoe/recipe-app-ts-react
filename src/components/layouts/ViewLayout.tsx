import TopNavBar from "../TopNavBar";

type ViewLayout = {
	children: React.ReactNode;
};

const ViewLayout = (props: ViewLayout) => {
	return (
		<div className='w-screen h-[90vh] bg-slate-800'>
			<TopNavBar />
			<div id='view-inner-container' className='w-full h-full'>
				{props.children}
			</div>
		</div>
	);
};

export default ViewLayout;
