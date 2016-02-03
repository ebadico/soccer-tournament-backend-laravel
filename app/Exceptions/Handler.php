<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
    AuthorizationException::class,
    HttpException::class,
    ModelNotFoundException::class,
    ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
      return parent::report($e);
    }


    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e){

    
      if ($this->isHttpException($e)){

        return $this->renderHttpException($e);

      }elseif ($e instanceof \PDOException) {

        $res['exception'] = get_class($e);

        $dbCode = trim($e->getCode());
        
        //Codes specific to mysql errors
        switch ($dbCode){
          case 23000:
            $res['messsage'] = 'Duplicate entry - Please change the values';
            $res['code'] = $dbCode;
          break;
          default:
            $res['messagez'] = 'Unknown database error:';
            $res['code'] = $dbCode;
        }

         return response()->json($res, 400);

      }
      else
      {
        return parent::render($request, $e);
      }
    }
  }
