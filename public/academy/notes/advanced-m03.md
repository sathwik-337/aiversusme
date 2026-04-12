# AI for Advanced Learners - Module 03: Large Language Models (LLMs) Deep Dive

---

## Page 1: Inside the Transformer Block

To master LLMs, one must understand the architectural choices that enable their reasoning capabilities.

### 1.1 Pre-Norm vs. Post-Norm
- **Post-Norm**: The original Transformer placed LayerNorm after the residual connection. This is harder to train without a learning rate warmup.
- **Pre-Norm**: Modern models (like Llama) place LayerNorm *before* the attention and MLP blocks. This provides more stable gradients and allows for deeper networks.

### 1.2 Activation Functions: ReLU to SwiGLU
- **ReLU**: Simple but can suffer from "dead neurons."
- **GeLU**: A smoother version used in GPT-2 and BERT.
- **SwiGLU**: The current state-of-the-art used in Llama 2/3. It is a gated linear unit that provides better expressive power for the same parameter count.

### 1.3 Key-Value (KV) Caching
In autoregressive generation, we re-use the Keys and Values of previous tokens.
- **The Problem**: Memory usage for the KV cache grows linearly with sequence length.
- **Multi-Query Attention (MQA)**: All heads share a single set of Keys and Values.
- **Grouped-Query Attention (GQA)**: A middle ground used in Llama 3, where heads are grouped to share KV pairs, balancing quality and speed.

---

## Page 2: Tokenization and Vocabulary Engineering

Tokenization is the first step in the LLM pipeline and often the most overlooked.

### 2.1 Subword Algorithms
- **BPE (Byte-Pair Encoding)**: Merges frequent character pairs. Used by OpenAI.
- **WordPiece**: Similar to BPE but uses a likelihood-based merging rule. Used by Google (BERT).
- **SentencePiece**: Treats the input as a raw stream of bytes, removing the need for language-specific pre-tokenizers.

### 2.2 The Out-of-Vocabulary (OOV) Problem
Subword tokenization ensures that even unknown words can be broken down into known fragments (e.g., "AI-driven" becomes ["AI", "-", "driven"]).

### 2.3 Vocabulary Size Trade-offs
- **Large Vocab (e.g., 128k tokens)**: More efficient for long documents but increases the size of the embedding and output layers.
- **Small Vocab (e.g., 32k tokens)**: Smaller model size but requires more tokens to represent the same text, increasing sequence length.

---

## Page 3: Training Paradigms: Pre-training to RLHF

Building a state-of-the-art LLM involves a multi-stage training pipeline.

### 3.1 Self-Supervised Pre-training
The model learns from trillions of tokens by predicting the next word (Causal Language Modeling). This is where the model acquires its world knowledge and grammar.

### 3.2 Supervised Fine-Tuning (SFT)
The model is trained on high-quality, human-written instruction-response pairs (e.g., "Explain quantum physics" -> [Detailed explanation]). This aligns the model to act as a helpful assistant.

### 3.3 Alignment with RLHF
Reinforcement Learning from Human Feedback (RLHF) ensures the model's outputs match human preferences for safety and helpfulness.
- **Reward Model**: Trained on human rankings of multiple model outputs.
- **PPO/DPO**: Algorithms used to optimize the model to maximize the reward signal.

---

## Page 4: Positional Embeddings and Context Windows

How does a model know the difference between "The cat sat on the mat" and "The mat sat on the cat"?

### 4.1 Learned vs. Fixed Encodings
- **Learned**: The model learns a vector for every position (0, 1, 2...). Limited to the length seen during training.
- **Sinusoidal**: Fixed mathematical functions. Theoretically allows for some extrapolation.

### 4.2 Rotary Positional Embeddings (RoPE)
RoPE encodes position by rotating the Query and Key vectors in a multi-dimensional space.
- **Relative Distance**: The dot product between two RoPE vectors depends only on their relative distance, not their absolute positions.
- **Extrapolation**: RoPE allows for techniques like "LongRoPE" to extend context windows far beyond training lengths.

---

## Page 5: Scaling Laws and the Future of LLMs

### 5.1 The Chinchilla Scaling Law
DeepMind discovered that most LLMs were "under-trained." For every doubling of model size, the training tokens should also double.
- **Implication**: It is often better to train a smaller model (e.g., 8B) on more data (e.g., 15T tokens) than a larger model on less data.

### 5.2 Beyond Text: Native Multimodality
The next generation of LLMs (like GPT-4o) are trained from day one on text, images, and audio in a single unified architecture, rather than using separate encoders.

### 5.3 Efficiency: Quantization and Distillation
- **Quantization (INT8/FP8)**: Reducing the precision of weights to save memory and speed up inference.
- **Distillation**: Training a smaller "student" model to mimic the outputs of a larger "teacher" model.

### 5.4 Self-Assessment Exercise
1. Why does Grouped-Query Attention (GQA) improve inference speed?
2. Contrast the training objectives of SFT and RLHF.
3. How does the "Chinchilla" discovery change how we approach model training?

---
© 2026 AI VS ME Academy. All Rights Reserved.
