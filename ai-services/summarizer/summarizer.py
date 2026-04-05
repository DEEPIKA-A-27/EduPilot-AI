from transformers import pipeline

summarizer = pipeline("summarization")

def summarize(text):
    if len(text.split()) < 10:
        return text
    return summarizer(text, max_length=50, min_length=10, do_sample=False)[0]['summary_text']

if __name__ == "__main__":
    print(summarize("This is a long text that needs to be summarized."))