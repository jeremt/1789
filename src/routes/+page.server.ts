import dialogs from '$lib/dialogs.json';
import distribution from '$lib/distribution.json';

type Scene = {
	title: string;
	dialogs: (
		| { type: 'didascalie'; text: string }
		| { type: 'dialog'; character: string; text: string }
	)[];
};

export const load = () => {
	return {
		dialogs: dialogs.map(({ title, dialogs }) => {
			return {
				title,
				dialogs: dialogs.reduce(
					(acc, current) => {
						const lastItem = acc[acc.length - 1];
						if (lastItem && lastItem.type === 'didascalie' && current.type === 'didascalie') {
							lastItem.text += `\n${current.text}`;
						} else {
							acc.push({ ...current });
						}
						return acc;
					},
					[] as typeof dialogs
				)
			};
		}) as Scene[],
		distribution
	};
};
