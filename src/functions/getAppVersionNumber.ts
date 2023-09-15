export default function getAppVersionNumber(): number {
	//@ts-ignore
	return parseInt(import.meta.env.VITE_APP_VERSION_NUMBER);
}
