import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import { useState } from "react"
import { useAxios } from "@/Middleware"

const formSchema = z.object({
  userName : z.string()
    .max(15,{message:"Maximun 15 Characters allowed"})
    .min(1,{message:"Username is required"}),
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z.string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password should be atleast 8 characters" }),
});

const formInputs = [
  { label: "Username", name: "userName", type: "text", placeholder: "John Duo"},
  { label: "Email", name: "email", type: "email", placeholder: "mail@example.com", case : "lower"},
  { label: "Password", name: "password", type: "password", placeholder: "********" }
]

export default function SignUpForm() {
  //For Better User experience 
  const [isLoading,setIsLoading] = useState(false);

  // Define form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {userName:"", email: "", password: "" }
  });

  // Define a submit handler.
  function onSubmit(values) {
    setIsLoading(true);
    useAxios({
      method: "POST",
      url: "/api/signup",
      data : {...values}
    }).then(res => {
      console.log(res);
      if(res.isSuccess){
        toast.success("User added !")
      }else{
        toast.warn(res.displayMessage)
      }
      setIsLoading(false);
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center sm:justify-center pt-6 sm:p-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto max-w-sm sm:border">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>

              {/* For each form feild */}
              {formInputs.map((value, key) => (
                <FormField key={key}
                  control={form.control}
                  name={value.name}
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>{value.label}</FormLabel>
                      <FormControl>
                        <Input type={value.type} placeholder={value.placeholder} {...field} onChange={(e) => {
                          // Transform input value to uppercase
                          if(value.case === "upper"){
                            e.target.value = e.target.value.toUpperCase();
                          }else if(value.case === "lower"){
                            e.target.value = e.target.value.toLowerCase();
                          }
                          field.onChange(e);
                        }}/>
                      </FormControl>
                      {
                        (value.description !== null && value.description !== "")?
                        (<FormDescription>{value.description}</FormDescription>) : ''
                      }
                      <FormMessage className="mt-1" />
                    </FormItem>
                  )}
                />
              ))}

              {/* Submit Button */}
              <Button disabled={isLoading} type="submit" className="w-full mt-2">
                { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
                Create an account
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  )
}
