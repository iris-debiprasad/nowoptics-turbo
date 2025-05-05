import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
} from "@mui/material";
import React from "react";
import IconSVG from "../iconsvg/IconSVG";
import styles from "./faq.module.scss";

export interface FAQItem {
    /** FAQ Question. Could be written as string or HTML (string)  */
    question: string;
    /** FAQ Answer. Could be written as string or HTML (string)  */
    answer: string;
}

interface Props {
    /** Class for styling the faq container */
    className?: string;
    /** FAQs to be rendered */
    faqs: FAQItem[];
}

/**
 * FAQ section for mobile and desktop view, specify the questions and answers by using a simple string
 * or HTML content. On mobile, questions will be stacked, on desktop, two columns are displayed
 *
 * @example
 * <FAQ faqs={[{ question: "this is my question", answer: `<p>this is my response, hello ${world}</p>` }]} />
 */
export const FAQ = ({ className, faqs }: Props): JSX.Element => {
    const [activeQuestion, setActiveQuestion] = React.useState<number | null>(
        null,
    );

    const toggleQuestion = (question: number): void =>
        setActiveQuestion((prev) => (prev === question ? null : question));

    return (
        <section className={`${styles.faq} ${className || ""}`}>
            {faqs.map(({ answer, question }, index) => (
                <Box key={question}>
                    <Accordion
                        expanded={activeQuestion === index}
                        onChange={() => toggleQuestion(index)}
                    >
                        <AccordionSummary
                            expandIcon={
                                activeQuestion !== index ? (
                                    <IconSVG
                                        width="24"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        fill="#f98300"
                                        name="rounded_plus_icon"
                                    />
                                ) : (
                                    <IconSVG
                                        width="24"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        fill="#f98300"
                                        name="rounded_minus_icon"
                                    />
                                )
                            }
                        >
                            <p
                                className={styles.item__question}
                                dangerouslySetInnerHTML={{ __html: question }}
                            />
                        </AccordionSummary>

                        <AccordionDetails
                            classes={{ root: styles["item__answer"] }}
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    </Accordion>
                </Box>
            ))}
        </section>
    );
};

FAQ.DisplayName = "FAQ";
