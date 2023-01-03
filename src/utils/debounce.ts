let timeout: ReturnType<typeof setTimeout>;

export function createDebounce(fnc: any, delayMs: number) {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		fnc();
	}, delayMs || 1000);
}


