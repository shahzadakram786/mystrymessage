import { Font, Heading, Html, Preview, Row, Section, Text} from "@react-email/components";


interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }
    : VerificationEmailProps) {
        return(
            <Html>
                <head>
                    <title>Verification Code</title>
                    
                </head>
                <Preview>Here&apos;s your Verification code: {otp}
                </Preview>

                <Section>
                    <Row>
                        <Heading as="h2">Hello {username}, </Heading>
                    </Row>
                    <Row>
                        <Text>
                            Thank you for registering. Please use the following OTP to verify your account:
                        </Text>
                    </Row>
                    <Row>
                        <Text>
                            <strong>{otp}</strong>
                        </Text>
                    </Row>
                    <Row>
                        <Text>
                            If you did not request this, please ignore this email.
                        </Text>
                    </Row>
                    
                   
                </Section>

            </Html>
        )
    }