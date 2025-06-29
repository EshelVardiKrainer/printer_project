import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { ProfileReadyPopup } from "../../components/ui/ProfileReadyPopup"; // Added import

interface AnswerType {
  questionText: string;
  answerText: string;
  optionValue: string;
}

export const Screen = (): JSX.Element => {
  const [answers, setAnswers] = useState<{ [key: string]: AnswerType }>({});
  const [examineeName, setExamineeName] = useState(""); // State for examinee name
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false); // Added state for popup
  // l  => left‑to‑right, r => right‑to‑left
  const [direction, setDirection] = useState<"l" | "r">("r");

  /**
   * When the user toggles L/R we update the global `dir` attribute so that
   * every element (including 3rd‑party components) inherits the proper flow
   */
  useEffect(() => {
    document.documentElement.dir = direction === "r" ? "rtl" : "ltr";
  }, [direction]);

  /* --------------------------------------------------------------------- */
  /*                          QUESTIONS META DATA                          */
  /* --------------------------------------------------------------------- */
  const questions = [
    { id: 1, question: "מה מגדרך?", options: ["גבר", "אישה", "אחר", "מעדיף/ה לא לענות"] },
    { id: 2, question: "מה גילך?", options: ["מתחת ל-18", "18-30", "31-50", "51 ומעלה"] },
    { id: 3, question: "מה המצב המשפחתי שלך?", options: ["רווק/ה", "בזוגיות", "נשוי/ה", "זה מסובך"] },
    { id: 4, question: "מה הזהות הדתית שלך?", options: ["חילוני/ת", "מסורתי/ת", "דתי/ה", "חרדי/ת"] },
    {
      id: 5,
      question: "האם יש לך ילדים?",
      options: ["כן, ילד/ה אחד/ת", "כן, כמה ילדים/ות", "לא, אבל רוצה", "לא ולא רוצה"],
    },
    {
      id: 6,
      question: "במה את/ה עוסק/ת?",
      options: ["מקצוע יצירתי", "מקצוע טכני/שירותי", "סטודנטי/ת", "לא עובד/ת כרגע"],
    },
    {
      id: 7,
      question: "איך את/ה מתלבש/ת ביומיום?",
      options: ["לפי נוחות", "לפי טרנדים", "לפי האירוע", "לא חושב/ת על זה"],
    },
    {
      id: 8,
      question: "איך את/ה מרגיש/ה עם הגוף שלך?",
      options: ["מרוצה מאוד", "לפעמים מרוצה, לפעמים לא", "לא מרוצה בכלל", "לא חושב/ת בזה"],
    },
    {
      id: 9,
      question: "איך את/ה מתאר/ת את סגנון החיים שלך?",
      options: [
        "מהיר, תמיד בתנועה",
        "מאורגן, עם זמן לכל דבר",
        "אקראי, לא תמיד יש תוכנית",
        "רגוע, אוהב/ת לנוח",
      ],
    },
    { id: 10, question: "מה חשוב לך יותר?", options: ["קריירה", "זוגיות/משפחה", "לימודים", "חיפוש עצמי"] },
    {
      id: 11,
      question: "מה את/ה עושה ברוב הזמן הפנוי שלך?",
      options: ["לבד בבית", "עם חברים", "בעבודה או פרוייקטים", "ברשתות חברתיות"],
    },
    {
      id: 12,
      question: "איך את/ה מרגיש כשאת/ה לבד?",
      options: ["שקט ובשלווה", "לפעמים זה טוב, לפעמים קשה", "אני מרגישה לבד מדי", "מעולם לא חשבתי על זה"],
    },
    {
      id: 13,
      question: "איך את/ה מתאר/ת את הביטחון העצמי שלך?",
      options: ["גבוה מאוד", "משתנה לפי מצב", "די נמוך", "אין לי מושג"],
    },
    {
      id: 14,
      question: "איך את/ה בונה מערכת יחסים?",
      options: ["בקלות, מתחבר/ת מהר", "לאט, לוקח לי זמן", "תלוי באדם", "אני לא בונה מערכת יחסים"],
    },
    {
      id: 15,
      question: "מה הכי מלחיץ אותך?",
      options: ["כישלון", "חוסר משמעות", "לחץ מהסביבה", "אני לא נלחץ/ת בקלות"],
    },
    {
      id: 16,
      question: "מה הדרך שלך להתמודד עם קונפליקטים?",
      options: ["מתעמת/ת ישירות", "משתדל/ת להימנע", "מדבר/ת כשזה בטוח לי", "נותן/ת לדברים לעבור"],
    },
    {
      id: 17,
      question: "איך את/ה מגיב/ה לביקורת?",
      options: ["לוקח/ת ללב", "מנסה ללמוד ממנה", "מתגונן/ת מיד", "מתעלם/ת"],
    },
    {
      id: 18,
      question: "מה את/ה חושב/ת על ההגדרה שלך בעיני אחרים?",
      options: ["חשובה לי מאוד", "לפעמים אני חושב/ת על זה", "לא משנה לי", "לא יודע/ת איך מגדירים אותי"],
    },
  ];

  /* --------------------------------------------------------------------- */
  /*                              EVENT HANDLERS                           */
  /* --------------------------------------------------------------------- */
  const handleAnswerChange = (questionId: number, value: string, index: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    setAnswers((prev) => ({
      ...prev,
      [`question_${questionId}`]: {
        questionText: question.question,
        answerText: question.options[index],
        optionValue: value,
      },
    }));
  };

  const handleSubmitSurvey = async () => {
    console.log("Submitting survey with answers:", answers, "Name:", examineeName); // Include name in log
    
    // Check if we have any answers
    if (Object.keys(answers).length === 0) {
      console.error("No answers provided");
      alert("Please answer at least one question before submitting");
      return;
    }
    
    // Verify API Key and OpenAI Account Status:
    // 1. Double-check this API key is correct and active in your OpenAI dashboard.
    // 2. Ensure the account associated with this key has a valid payment method and no billing issues.
    // 3. Confirm that the API key has permissions to use the "gpt-4o" model.
    // 4. If part of an organization, check the organization's overall quota and spending limits.
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Use environment variable for API key
    if (!apiKey) {
      console.error("API key is missing");
      alert("API key is missing. Make sure it's set in your .env file.");
      return;
    }
    
    console.log("API key is valid:", apiKey.substring(0, 10) + "...");

    const answersSummary = Object.values(answers)
      .map((ans) => ans.answerText)
      .join("; ");

    const builtInPrompt = `
You are a helpful assistant that generates a social profile analysis based on a survey.
Based on the user's name and answers, generate a JSON object with the following structure.

The user's name is: "${examineeName}"
The user's answers are: "${answersSummary}"

Generate a JSON object with the following keys: "answers", "rules_al", "rules_zivui", "rules_qmark", "rules_ze", "rules_lo", "rules_tips".

- The "answers" key should contain a summary of the user's answers as a single string, with answers separated by semicolons and newlines for readability.
- The other keys ("rules_al", "rules_zivui", etc.) should contain a single string with rules separated by newline characters (\n).
- The rules should be based on the provided answers.
- The rules must be in Hebrew.
- The tone of the rules should be sharp, direct, and reflect unwritten social norms in Israel.
- Generate between 60 and 80 rules in total, distributed among the categories.
- Do not include any explanations or text outside of the JSON object.

Example of a single key-value pair:
"rules_al": "אל תהיי קולנית מדי\nאל תיכשלי מול כולם\nאל תעשה בושות"

The entire output must be a single, valid JSON object.
`;

    let surveyData = `User Answers:\n${answersSummary}`;

    console.log("Prompt being sent to API:", builtInPrompt);

    const requestBody = {
      model: "gpt-4o",
      messages: [{ role: "user", content: builtInPrompt }],
    };
    
    console.log("Request body:", JSON.stringify(requestBody));

    try {
      console.log("Sending request to OpenAI API...");
      
      // Debug network conditions
      console.log("Network status:", navigator.onLine ? "Online" : "Offline");
      
      // Using a timeout to catch hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            // Adding some debug headers
            "X-Debug-Info": "printer-project-debug",
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
          // Add mode for potential CORS issues
          mode: "cors",
        });
        
        clearTimeout(timeoutId);
        
        console.log("Response received. Status:", res.status);
        console.log("Response headers:", JSON.stringify([...res.headers.entries()]));
        console.log("Response type:", res.type);
        
        // Check for common HTTP errors
        if (res.status === 401) {
          console.error("Authentication error - Invalid API key");
          alert("Authentication error: Invalid API key");
          return;
        }
        
        if (res.status === 403) {
          console.error("Authorization error - No access to this resource");
          alert("Authorization error: Your API key doesn't have permission");
          return;
        }
        
        if (res.status === 429) {
          console.error("Rate limit exceeded or quota exceeded");
          alert("Rate limit or quota exceeded. Try again later.");
          return;
        }
        
        if (!res.ok) {
          console.error("API response not OK:", res.status, res.statusText);
          alert(`API Error: ${res.status} ${res.statusText}`);
          return;
        }
        
        // Try getting response text first for debugging
        const rawText = await res.text();
        console.log("Raw response text:", rawText.substring(0, 200) + "...");
        
        // Convert text to JSON
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (jsonError) {
          console.error("JSON parse error:", jsonError);
          console.error("Raw response:", rawText);
          alert("Error parsing API response as JSON");
          return;
        }
        
        console.log("Full API response:", data);
        
        if (!data.choices || !data.choices.length) {
          console.error("No choices in API response:", data);
          alert("Invalid response format from API");
          return;
        }
        
        const content = data.choices[0]?.message?.content;
        console.log("Response content:", content);
        console.log("LLM Answer for Terminal:", content); // Added for terminal output

        if (!content) {
          console.error("Content is empty in response:", data.choices[0]);
          alert("No response content from LLM");
          return;
        }

        // Show success popup and clear form
        setIsProfilePopupOpen(true);
        setAnswers({});
        setExamineeName("");

        try {
          // The LLM should return a JSON string.
          const llmResponse = JSON.parse(content);

          const now = new Date();
          const finalJson = {
            name_of_examine: examineeName,
            date: now.toLocaleDateString("he-IL"),
            time: now.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
            ...llmResponse,
          };

          console.log("Sending final JSON to localhost:3000", finalJson);

          // Send the result to localhost:3000
          await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalJson),
          });

          console.log("Successfully sent data to localhost:3000");

        } catch (jsonError) {
          console.error("Error processing or sending data:", jsonError);
          console.error("Raw content from LLM:", content);
          alert("An error occurred while processing the response. Check the console for details.");
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error) {
          if (fetchError.name === "AbortError") {
            console.error("Request timed out after 30 seconds");
            alert("API request timed out. Please try again.");
          } else {
            console.error("Fetch error:", fetchError);
            alert(`Network error: ${fetchError.message}`);
          }
        } else {
          console.error("An unexpected error occurred:", fetchError);
          alert("An unexpected error occurred. Please try again.");
        }
      }
    } catch (e) {
      console.error("Outer exception during API call:", e);
      alert(`Error while sending survey: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  /* --------------------------------------------------------------------- */
  /*                                 RENDER                                */
  /* --------------------------------------------------------------------- */
  return (
    <main
      dir={direction === "r" ? "rtl" : "ltr"}
      className="bg-white flex flex-row justify-center w-full"
    >
      <div className="bg-white w-full max-w-[720px] relative py-16 px-4">
        {/* ───────────────────────────────── HEADER ───────────────────────────────── */}
        <Card className="mb-4 overflow-hidden border-none rounded-none">
          <div className="bg-[#333333] p-5 flex justify-center items-center">
            <h1 className="font-['Courier_New-Regular',Helvetica] text-white text-[32px]">
              שאלון סיווג פרופיל חברתי
            </h1>
          </div>
          <CardContent className="border-2 border-t-0 border-[#333333] p-4">
            <div className="font-['Courier_New-Regular',Helvetica] text-[#333333] text-base leading-6">
              <strong>הוראות מילוי שאלון סיווג פרופיל חברתי</strong>
              <br />הנך נדרש/ת להשיב על כל 18 השאלות באופן מלא, לפי תחושתך הסובייקטיבית.
              <br />בחר/י תשובה אחת בלבד בכל סעיף.
              <br />השאלון הוא חלק מהליך מיון והתאמה לפרוטוקול חברתי.
              <br />אי־מילוי מדויק של השאלון עלול להשפיע על תוצאות הסיווג.
            </div>
          </CardContent>
        </Card>

        {/* ─────────────────────────────── NAME FIELD ─────────────────────────────── */}
        <Card className="mb-4 border-2 border-[#333333] rounded-none">
          <CardContent className="p-4">
            <div className="flex flex-col items-start">
              <Label htmlFor="name" className="font-bold text-[#333333] mb-2">
                שם הנבחן
              </Label>
              <Input
                id="name"
                placeholder="תשובה שלי"
                className="w-[241px] border-b border-[#333333] rounded-none text-right placeholder:text-[#33333380]"
                dir="rtl"
                value={examineeName} // Bind value to state
                onChange={(e) => setExamineeName(e.target.value)} // Update state on change
              />
            </div>
          </CardContent>
        </Card>

        {/* ──────────────────────────────── QUESTIONS ─────────────────────────────── */}
        {questions.map((q) => (
          <Card key={q.id} className="mb-4 border-2 border-[#333333] rounded-none">
            <CardContent className="p-4">
              <div className="text-right">
                <h2 className="font-bold text-[#333333] mb-4">
                  {q.id}. {q.question}
                </h2>
                <RadioGroup
                  dir="rtl"
                  onValueChange={(val) => {
                    const idx = parseInt(val.replace("option", ""), 10);
                    handleAnswerChange(q.id, val, idx);
                  }}
                  value={answers[`question_${q.id}`]?.optionValue || ""}
                >
                  {q.options.map((option, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      {/* RADIO BUTTON ON THE RIGHT */}
                      <RadioGroupItem
                        value={`option${idx}`}
                        id={`q${q.id}-option${idx}`}
                        className="h-[18px] w-[18px] rounded-full border-[#333333] ml-2"
                      />
                      <Label htmlFor={`q${q.id}-option${idx}`} className="text-[#333333]">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* ───────────────────────────────── ACTIONS ───────────────────────────────── */}
        <div className="flex justify-between mt-4">
          <Button
            className="bg-[#333333] text-white px-4 py-1 h-auto rounded-none"
            onClick={handleSubmitSurvey}
          >
            שליחת שאלון
          </Button>
          <Button variant="link" className="text-[#333333]" onClick={() => {
            setAnswers({});
            setExamineeName(""); // Clear name on manual clear
          }}>
            ניקוי שאלון
          </Button>
        </div>
      </div>

      {/* Profile Ready Popup */}
      <ProfileReadyPopup 
        isOpen={isProfilePopupOpen} 
        onClose={() => setIsProfilePopupOpen(false)} 
      />
    </main>
  );
};
