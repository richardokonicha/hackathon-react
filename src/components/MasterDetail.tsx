import React, { ReactElement } from 'react';

export type Payload = Record<string, any>;

export interface ItemProps {
	payload: Payload;
}

export const Item: React.FC<ItemProps> = () => {
	return <></>;
}

export interface DetailProps {
	children: (payload: Payload) => JSX.Element;
}

export const Detail: React.FC<DetailProps> = () => {
	return <></>
}

export interface MasterDetailProps {
	children?: (ReactElement<DetailProps> | ReactElement<ItemProps>)[];
}

export const MasterDetail: React.FC<MasterDetailProps> = ({ children = [] }) => {
	return (
		<div>
			<div>{children.filter(child => child.type === Item)}</div>
			<div>{children.filter(child => child.type === Detail)[0]}</div>
		</div>
	);
};
