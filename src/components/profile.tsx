"use client";

import { signOut, useSession } from "next-auth/react";

import { Icons } from "./icons";
import { AlertDialog } from "./ui/alert-dialog";
import { Avatar } from "./ui/avatar";
import { DropdownMenu } from "./ui/dropdown-menu";

export function Profile() {
	const { data: session } = useSession();

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild={true}>
				<Avatar asChild={true}>
					<button
						type="button"
						className="outline-none ring-offset-background transition focus:ring-2 focus:ring-ring focus:ring-offset-2"
					>
						<Avatar.Image src={session?.user.image || ""} />
						<Avatar.Fallback>
							<Icons.User className="size-4" />
						</Avatar.Fallback>
					</button>
				</Avatar>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className="w-56" align="end">
				<DropdownMenu.Label className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{session?.user.name}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{session?.user.email}
						</p>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<Icons.User className="mr-2 size-4" /> Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Icons.Settings className="mr-2 size-4" /> Settings
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<AlertDialog>
					<AlertDialog.Trigger asChild={true}>
						<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
							<Icons.LogOut className="mr-2 size-4" /> Log out
						</DropdownMenu.Item>
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Title>Confirm logout</AlertDialog.Title>
						<AlertDialog.Description>
							Are you sure you want to log out?
						</AlertDialog.Description>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action
								variant="destructive"
								onClick={() => signOut()}
							>
								Log out
							</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
}
