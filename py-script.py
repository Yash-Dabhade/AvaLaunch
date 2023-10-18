import sys
import joblib

def main():
    print("Hello",sys.argv[1])
    model=joblib.load("./ML/techmodelfinal.joblib")
    print(model.predict([[100,21]]))

if __name__=='__main__':
    main()