import sys
import joblib


def main():
    if(sys.argv[2]==1 or sys.argv[2]=="1"):
        model=joblib.load("./ML/techmodelfinal.sav")
        print(model.predict([[int(sys.argv[3]),int(sys.argv[4])]])[0])
    elif sys.argv[2]==2 or sys.argv[2]=="2":
        model=joblib.load("./ML/furnmodelfinal.sav")
        print(model.predict([[int(sys.argv[3]),int(sys.argv[4])]])[0])
    else:
        model=joblib.load("./ML/officemodelfinal.sav")
        print(model.predict([[int(sys.argv[3]),int(sys.argv[4])]])[0])

if __name__=='__main__':
    main()