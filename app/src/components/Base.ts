/// need to write a base component that other components can extends
/// see https://github.com/bparadie/react-flux-typescript-todomvc/blob/master/src/react/ReactComponent.ts

import * as React from 'react';

export default class BaseComponent<P,S> extends React.Component<P, S> {
	

	public getDerivedInitialState(): S {
		return null;
	}


}
