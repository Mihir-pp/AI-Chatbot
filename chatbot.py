from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model_name = "facebook/blenderbot-400M-distill"

"""
When running this code for the first time, the host machine will download the model 
from Hugging Face API.
However, after running the code once, the script will not re-download the model and 
will instead reference the local installation.
"""

# load model
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Keeping track of conversation history
conversation_history = []

while True:
  # Encode the conversation history
  history_string = "\n".join(conversation_history)

  # Fetch prompt from user
  input_text = input("> ")

  # Tokenization of user prompt and chat history
  inputs = tokenizer.encode_plus(history_string, input_text, return_tensors="pt") # return type: pyTorch tensors

  # Generate output from the model
  outputs = model.generate(**inputs)

  # Decode output
  response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
  print(response)

  # Add interaction to conversation history
  conversation_history.append(input_text)
  conversation_history.append(response)