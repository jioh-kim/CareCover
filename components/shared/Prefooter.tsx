import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { footerLinks } from "@/constants";
import Link from "next/link";

const Prefooter = () => {
  return (
    <>
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        {/* Empty div to move my main content to the right */}
        <div className="flex-1 w-full flex flex-wrap max-md:mt-10 gap-8 rounded-md p-5">
          {footerLinks.map((item) => (
            <div key={item.title} className="flex flex-col gap-6 text-base">
              <h3 className="font-bold">{item.title}</h3>
              <div className="flex flex-col gap-1">
                {item.links.map((link) => (
                  <Link key={link.title} href={link.url} className="text-gray-500">
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 rounded-md p-5">
          <h1 className="h5-bold">Frequently Asked Questions</h1>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Question 1</AccordionTrigger>
              <AccordionContent className="text-gray-500">
                Answer
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Question 2</AccordionTrigger>
              <AccordionContent>Answer</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Question 3</AccordionTrigger>
              <AccordionContent>Answer</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Prefooter;
