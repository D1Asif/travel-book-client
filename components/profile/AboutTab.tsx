import { Button, Card, Input } from "@nextui-org/react";
import { Envelope, Phone, User } from "@phosphor-icons/react";


export default function AboutTab() {
    
    return (
        <Card className="flex flex-col items-center mt-3">
            <div className="max-w-[350px] relative items-center space-y-10 m-7">
                <h1 className="text-lg">Account Information</h1>
                <Input
                    labelPlacement="outside"
                    label="Email"
                    placeholder="you@example.com"
                    className=""
                    startContent={
                        <Envelope className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                    }
                    type="email"
                />
                <Input
                    labelPlacement="outside"
                    label="Phone"
                    placeholder="0123456789"
                    startContent={
                        <Phone className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                    }
                    type="email"
                />
                <Input
                    labelPlacement="outside"
                    label="Role"
                    placeholder="User"
                    startContent={
                        <User className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                    }
                    type="email"
                />
                <div className="p-[10px]"/>
                <Button color="primary" className="absolute bottom-0">Edit</Button>
            </div>
        </Card>
    )
}
