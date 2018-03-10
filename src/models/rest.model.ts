import { OutgoingHttpHeaders } from 'http';

interface Headers extends OutgoingHttpHeaders {
	[props: string]: string;
}
