export default function getAppVersionNumber(): number {
	return parseInt(import.meta.env.VITE_APP_VERSION_NUMBER);
}
