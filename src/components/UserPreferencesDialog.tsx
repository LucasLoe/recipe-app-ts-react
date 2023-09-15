import Dialog from "./Dialog";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useUserData } from "../contexts/UserDataContext";
import LayoutRow from "./UI/LayoutRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { HealthTags, MealType, UserData } from "../types";
import Pill from "./UI/Pill";

type UserPreferencesDialogProps = {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const UserPreferencesDialog = (props: UserPreferencesDialogProps) => {
	const { userData, setUserData } = useUserData();
	const [tempUserData, setTempUserData] = useState<UserData>(userData);

	useEffect(() => {
		setTempUserData((prev) => {
			return {
				...prev,
				userSettings: {
					...prev.userSettings,
				},
			};
		});
	}, []);

	function handleMealTypeSelect(mealTypeKey: keyof typeof MealType) {
		setTempUserData((prevUserData) => {
			return {
				...prevUserData,
				userSettings: {
					...prevUserData.userSettings,
					mealType: mealTypeKey,
				},
			};
		});
	}

	function handleHealthLabelSelect(healthlabelKey: keyof typeof HealthTags) {
		let newUserSettings = { ...tempUserData.userSettings };
		newUserSettings.health.includes(healthlabelKey)
			? (newUserSettings.health = newUserSettings.health.filter((e) => e != healthlabelKey))
			: (newUserSettings.health = [...newUserSettings.health, healthlabelKey]);
		setTempUserData((prevUserData) => {
			return {
				...prevUserData,
				userSettings: newUserSettings,
			};
		});
	}

	function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTempUserData((prev) => {
			return {
				...prev,
				userSettings: {
					...prev.userSettings,
					lastSearchQuery: e.target.value,
				},
			};
		});
	}

	function handleEnterKey(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			saveAndReturn();
		}
	}

	function saveAndReturn() {
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				userSettings: {
					...tempUserData.userSettings,
				},
			};
		});
		props.setIsVisible(false);
	}

	return (
		<Dialog
			title={"Adjust your preferences:"}
			isVisible={props.isVisible}
			setIsVisible={props.setIsVisible}
		>
			<div className=''>
				<LayoutRow label='Search query:'>
					<input
						className='px-2 py-3 h-6 grow outline outline-amber-50 outline-2 bg-transparent appearance-none rounded text-amber-50'
						value={
							tempUserData.userSettings.lastSearchQuery != ""
								? tempUserData.userSettings.lastSearchQuery
								: ""
						}
						onChange={(e) => handleQueryChange(e)}
						onKeyDown={(e) => handleEnterKey(e)}
					/>
				</LayoutRow>
				<LayoutRow label='Meal type:'>
					<div className='flex flex-row flex-wrap gap-2'>
						{Object.keys(MealType).map((mealType, idx) => {
							const mealTypeKey = mealType as keyof typeof MealType;
							return (
								<Pill
									key={idx}
									label={MealType[mealTypeKey]}
									isSelected={tempUserData.userSettings.mealType === mealTypeKey}
									setIsSelected={() => handleMealTypeSelect(mealTypeKey)}
								/>
							);
						})}
					</div>
				</LayoutRow>
				<LayoutRow label='Health labels:'>
					<div className='flex flex-row flex-wrap gap-2'>
						{Object.keys(HealthTags).map((healthLabel, idx) => {
							const healthLabelKey = healthLabel as keyof typeof HealthTags;
							return (
								<Pill
									key={idx}
									label={HealthTags[healthLabelKey]}
									isSelected={tempUserData.userSettings.health.includes(healthLabelKey)}
									setIsSelected={() => handleHealthLabelSelect(healthLabelKey)}
								/>
							);
						})}
					</div>
				</LayoutRow>

				<LayoutRow>
					<FontAwesomeIcon
						onClick={() => saveAndReturn()}
						icon={faArrowRight}
						className='text-amber-50 h-4 outline outline-2 outline-amber-50 p-1 mr-0 ml-auto rounded'
					/>
				</LayoutRow>
			</div>
		</Dialog>
	);
};

export default UserPreferencesDialog;
