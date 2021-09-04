import { useEffect } from "react";

export const useMountEffect = (fun: any) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(fun, []);
}