export const getColorClassName = method => {
	switch (method) {
		case 'GET': {
			return 'bg-green-100 text-green-600';
		}

		case 'HEAD': {
			return 'bg-fuchsia-100 text-fuchsia-600';
		}

		case 'POST': {
			return 'bg-sky-100 text-sky-600';
		}

		case 'PUT': {
			return 'bg-amber-100 text-amber-600';
		}

		case 'DELETE': {
			return 'bg-rose-100 text-rose-600';
		}

		case 'CONNECT': {
			return 'bg-violet-100 text-violet-600';
		}

		case 'OPTIONS': {
			return 'bg-neutral-100 text-neutral-600';
		}

		case 'TRACE': {
			return 'bg-indigo-100 text-indigo-600';
		}

		case 'PATCH': {
			return 'bg-orange-100 text-orange-600';
		}
	}
};
