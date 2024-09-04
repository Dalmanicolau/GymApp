import { useState } from "react";


function LoginForm() {
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("Test1234");
    

    function handleSubmit(event) {
        
    }


    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" >
                    Log in
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
