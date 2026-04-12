# AI for Engineers - Module 04: Data Preprocessing

---

## Page 1: The Criticality of Data Quality

In AI engineering, the quality of your output is directly determined by the quality of your input data. This is often summarized as "Garbage In, Garbage Out" (GIGO).

### 1.1 Data Preprocessing in the AI Lifecycle
Preprocessing is often the most time-consuming part of an AI project, taking up to 80% of an engineer's time. It bridges the gap between raw, messy real-world data and structured, numerical data that a model can ingest.

### 1.2 Common Data Issues
- **Missing Values**: Due to sensor failure, human error, or data corruption.
- **Outliers**: Extreme values that can skew statistical models and gradients.
- **Inconsistent Formats**: Dates in different formats, mixed casing in text, or inconsistent units.
- **Imbalanced Classes**: When one category is significantly more frequent than others, biasing the model.

### 1.3 Exploratory Data Analysis (EDA)
Before cleaning, you must understand your data.
- **Descriptive Statistics**: Mean, median, standard deviation, and quartiles.
- **Visual Profiling**: Histograms for distributions, scatter plots for correlations, and box plots for outliers.

---

## Page 2: Cleaning and Handling Missing Data

Data cleaning is the process of detecting and correcting (or removing) corrupt or inaccurate records.

### 2.1 Handling Missing Values
- **Deletion**: Removing rows or columns with missing values. Use only if data is abundant and missingness is random.
- **Imputation**: Filling in missing values.
    - **Simple Imputation**: Mean, median, or mode.
    - **Advanced Imputation**: Using algorithms like K-Nearest Neighbors (KNN) or MICE (Multivariate Imputation by Chained Equations) to predict missing values based on other features.
- **Flagging**: Creating a binary "is_missing" feature to let the model know data was absent.

### 2.2 Outlier Detection and Treatment
- **Z-Score**: Identifying points that are more than $N$ standard deviations from the mean.
- **IQR (Interquartile Range)**: Identifying points outside the $[Q1 - 1.5*IQR, Q3 + 1.5*IQR]$ range.
- **Treatment**:
    - **Trimming**: Removing the outliers.
    - **Winsorization**: Capping the extreme values at a certain percentile.
    - **Transformation**: Applying log or square root transforms to reduce the impact of extreme values.

---

## Page 3: Feature Scaling and Encoding

Machine learning models are sensitive to the scale and format of the input features.

### 3.1 Feature Scaling
Models like SVM, KNN, and Neural Networks use distance metrics or gradient descent, making them sensitive to feature scales.
- **Normalization (Min-Max Scaling)**: Rescales data to a fixed range, usually $[0, 1]$.
    $$x_{norm} = \frac{x - x_{min}}{x_{max} - x_{min}}$$
- **Standardization (Z-score Scaling)**: Rescales data to have a mean of 0 and a standard deviation of 1.
    $$x_{std} = \frac{x - \mu}{\sigma}$$
- **Robust Scaling**: Uses the median and IQR, making it less sensitive to outliers.

### 3.2 Categorical Encoding
Converting non-numerical data into numbers.
- **Label Encoding**: Assigning a unique integer to each category (e.g., Red=0, Blue=1). Best for ordinal data (where order matters).
- **One-Hot Encoding**: Creating a binary column for each category. Prevents the model from assuming a false numerical relationship between categories.
- **Target Encoding**: Replacing categories with the mean of the target variable for that category (use with caution to avoid leakage).

---

## Page 4: Feature Engineering and Selection

Feature engineering is the art of creating new features from raw data to improve model performance.

### 4.1 Creating New Features
- **Interaction Features**: Multiplying or dividing two features (e.g., Area = Length * Width).
- **Polynomial Features**: Adding squares or cubes of features to capture non-linear relationships.
- **Domain-Specific Features**: E.g., extracting "IsWeekend" from a date or "EmailDomain" from an address.

### 4.2 Feature Selection
Reducing the number of features to prevent overfitting and improve training speed.
- **Filter Methods**: Using statistical tests (e.g., Correlation, Chi-Square) to rank features.
- **Wrapper Methods**: Training a model on different subsets of features (e.g., Recursive Feature Elimination).
- **Embedded Methods**: Using models that perform selection during training (e.g., L1 Regularization / Lasso).

### 4.3 Dimensionality Reduction
- **PCA (Principal Component Analysis)**: A linear technique that projects data into a lower-dimensional space while preserving variance.
- **t-SNE and UMAP**: Non-linear techniques primarily used for visualizing high-dimensional data in 2D or 3D.

---

## Page 5: Summary and Pipeline Automation

### 5.1 Module Summary
- **Data Quality** is the most important factor in AI performance.
- **Cleaning** involves handling missing values and outliers carefully.
- **Scaling and Encoding** ensure the model can process features effectively.
- **Feature Engineering** allows engineers to inject domain knowledge into the model.
- **Dimensionality Reduction** simplifies complex data while retaining key information.

### 5.2 Building Robust Preprocessing Pipelines
In production, you should never apply preprocessing steps manually.
- **Scikit-Learn Pipelines**: Chain together scaling, encoding, and model training into a single object. This prevents **Data Leakage** (using information from the test set during training).
- **ColumnTransformers**: Apply different preprocessing steps to different columns (e.g., scaling numbers while encoding text).

### 5.3 Self-Assessment Exercise
1. When would you choose Standardization over Min-Max Scaling?
2. Explain the risk of "Data Leakage" during preprocessing.
3. How does PCA help in reducing the "Curse of Dimensionality"?

---
© 2026 AI VS ME Academy. All Rights Reserved.
