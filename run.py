from app.learn2draw import create_app

app = create_app()
app.run(debug=True, threaded=True)