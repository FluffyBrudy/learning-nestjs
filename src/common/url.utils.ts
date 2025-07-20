import { InternalServerErrorException } from "@nestjs/common";
import { Request } from "express";

export function constructUrl(req: Request, route: string) {
	const protocol = req.get("protocol")
	const host = req.get("host")
	if (!protocol || !host) return new InternalServerErrorException({error: "invalid url served"})
	return `${protocol}://${host}/${route.replace(/^\/|\/$/g, "")}`
}


