const LCERROR = "\x1b[31m%s\x1b[0m"; //red
const LCWARN = "\x1b[33m%s\x1b[0m"; //yellow
const LCINFO = "\x1b[36m%s\x1b[0m"; //cyan
const LCSUCCESS = "\x1b[32m%s\x1b[0m"; //green

export const log = {
	error: (message: string) => {
		console.error(LCERROR, message);
	},
	warn: (message: string) => {
		console.warn(LCWARN, message);
	},
	info: (message: string) => {
		console.info(LCINFO, message);
	},
	success: (message: string) => {
		console.info(LCSUCCESS, message);
	}
};
