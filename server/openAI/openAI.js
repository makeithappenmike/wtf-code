const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  // need to get env working
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  
});

// take in a snippet and input it in the prompt with the explainer string
const snippet = "//javascript\nfunction myFunction(p1, p2) {\n  return p1 * p2;\n}\n";

// if we don't add the explainer, it doesn't explain!
const classExplainer = "\"\"\"\nHere's what the above class is doing:\n1.";
const functionExplainer = "\"\"\"\nHere's what the above function is doing:\n1.";
const codeExplainer = "\"\"\"\nHere's what the above code is doing:\n1.";


export async function code($explainer, $snippet) {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: $snippet + $explainer,
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\"\"\""],
    });
    
    // going to need this data returned, right?
    const answer = response['data']['choices'][0].text;
    console.log(answer);
    return answer;
}

// code(functionExplainer, snippet);