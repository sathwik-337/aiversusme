# AI for Engineers - Module 05: Machine Learning Algorithms

---

## Page 1: Supervised Learning – Regression

Supervised learning is the paradigm where the model learns from labeled data. Regression is used when the target variable is a continuous numerical value.

### 1.1 Linear Regression
The simplest and most interpretable regression algorithm. It assumes a linear relationship between input features and the target.
- **Simple Linear Regression**: $y = mx + b$.
- **Multiple Linear Regression**: $y = w_1x_1 + w_2x_2 + ... + w_nx_n + b$.
- **Cost Function**: Usually Mean Squared Error (MSE).
- **Optimization**: Ordinary Least Squares (OLS) or Gradient Descent.

### 1.2 Polynomial Regression
Captures non-linear relationships by adding powers of the original features (e.g., $x^2, x^3$) as new features.
- **Risk**: High-degree polynomials can easily lead to **Overfitting**.

### 1.3 Regularized Regression (Lasso and Ridge)
Prevents overfitting by adding a penalty term to the cost function.
- **Ridge Regression (L2)**: Penalizes the square of coefficients. Keeps all features but shrinks their weights.
- **Lasso Regression (L1)**: Penalizes the absolute value of coefficients. Can shrink some weights to zero, performing automatic **Feature Selection**.

---

## Page 2: Supervised Learning – Classification

Classification is used when the target variable belongs to a set of discrete categories.

### 2.1 Logistic Regression
Despite the name, it's a classification algorithm. It uses the **Sigmoid Function** to map a linear combination of inputs to a probability between 0 and 1.
- **Binary Classification**: (e.g., Spam vs. Not Spam).
- **Multinomial Logistic Regression**: (e.g., Classifying digits 0-9).

### 2.2 Support Vector Machines (SVM)
Finds the **Hyperplane** that best separates classes by maximizing the "margin" between the nearest data points (support vectors).
- **Kernel Trick**: Allows SVMs to solve non-linearly separable problems by projecting data into a higher-dimensional space where it *is* separable.

### 2.3 K-Nearest Neighbors (KNN)
A "lazy" learner that doesn't build a model during training. It classifies new points based on the majority class of its $K$ nearest neighbors.
- **Sensitivity**: Very sensitive to the choice of $K$ and the distance metric (e.g., Euclidean vs. Manhattan).

---

## Page 3: Tree-Based and Ensemble Methods

Tree-based models are highly popular due to their ability to handle non-linear data and their interpretability.

### 3.1 Decision Trees
Split data into branches based on feature values that provide the highest "Information Gain" (or lowest Gini Impurity).
- **Pros**: Easy to visualize and explain.
- **Cons**: Prone to overfitting (growing too deep).

### 3.2 Random Forests (Bagging)
An ensemble of many Decision Trees trained on random subsets of the data and features.
- **Wisdom of the Crowd**: The final prediction is the average (for regression) or majority vote (for classification) of all trees.
- **Stability**: Much more robust and less prone to overfitting than a single tree.

### 3.3 Gradient Boosting (Boosting)
Trees are built sequentially, with each new tree attempting to correct the errors made by the previous ones.
- **Popular Libraries**: XGBoost, LightGBM, and CatBoost are the gold standard for structured (tabular) data in industry.

---

## Page 4: Unsupervised Learning – Clustering

Unsupervised learning finds hidden patterns in data without the use of labels.

### 4.1 K-Means Clustering
Partitions data into $K$ clusters by iteratively assigning points to the nearest cluster centroid and then updating the centroids.
- **Elbow Method**: A technique to choose the optimal value of $K$ by plotting the sum of squared distances.

### 4.2 Hierarchical Clustering
Creates a tree-like structure (Dendrogram) of clusters.
- **Agglomerative**: Bottom-up approach where each point starts as its own cluster.
- **Divisive**: Top-down approach where all points start in one cluster.

### 4.3 Density-Based Clustering (DBSCAN)
Groups points that are close to each other in high-density regions while marking points in low-density regions as outliers.
- **Advantage**: Can find clusters of arbitrary shapes and is robust to noise.

---

## Page 5: Summary and Model Selection

### 5.1 Module Summary
- **Regression** predicts continuous values (Linear, Lasso, Ridge).
- **Classification** predicts categories (Logistic, SVM, KNN).
- **Ensemble Methods** combine models for superior performance (Random Forest, XGBoost).
- **Clustering** discovers natural groupings in data (K-Means, DBSCAN).

### 5.2 Choosing the Right Algorithm
As an engineer, your choice depends on several factors:
- **Type of Data**: XGBoost/Random Forest for tabular data; CNNs for images; RNNs/Transformers for text.
- **Interpretability**: Linear Regression and Decision Trees are "White Box" (easy to explain); Deep Learning and Boosting are "Black Box."
- **Compute Budget**: KNN is slow at inference; Boosting is slow at training.
- **Amount of Data**: Deep learning requires massive data; traditional ML (like SVM or Random Forest) works better on small datasets.

### 5.3 Self-Assessment Exercise
1. What is the main difference between Bagging (Random Forest) and Boosting (XGBoost)?
2. Why is it important to scale features before using KNN or SVM?
3. In K-Means, how does the algorithm decide where to place the initial centroids, and how does this affect the result?

---
© 2026 AI VS ME Academy. All Rights Reserved.
