<?php
// src/Controller/Api.php
namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\DBAL\Driver\Connection;
use Doctrine\ORM\EntityManager;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use \Datetime;

class Api extends Controller
{

    /**
     * @Route("/api/insertNewTask")
     * @Method({"GET"})
     */
    public function insertNewTask(Request $request) {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        try
        {
            $newTask = new Task();
            $newTask->setName($request->query->get('name'));
            $newTask->setDescription($request->query->get('description'));
            $newTask->setDuration($request->query->get('duration'));
            $newTask->setStartDate(new \DateTime($request->query->get('startDate'))) ;
            $newTask->setFinishDate(new \DateTime($request->query->get('finishDate'))) ;
            $newTask->setStatus($request->query->get('status'));
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newTask);
            $entityManager->flush();

            $response->setContent($newTask->getId());
        }
        catch(Exception $e)
        {
            $response->setContent("0");
        }
        return $response;
    }

    /**
     * @Route("/api/updateTask")
     * @Method({"GET"})
     */
    public function updateTask(Request $request) {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        try
        {
            $entityManager = $this->getDoctrine()->getManager();
            $taskId = $request->query->get('id');
            $name = $request->query->get('name') ;
            $description = $request->query->get('description') ;
            $startDate = $request->query->get('startDate');
            $finishDate = $request->query->get('finishDate');
            $taskDuration = $request->query->get('duration');
            $taskStatus = $request->query->get('status');

            $taskId = $entityManager->getRepository(Task::class)->find($taskId);
            if (!$taskId) {
                //The required id is not founded
                $response->setContent("0");
                return $response;
            }

            $taskId->setDuration($taskDuration);
            if($description!=null)
            {
                $taskDescp = $taskId->setDescription($description);
            }
            if($name!=null)
            {
                $taskDescp = $taskId->setName($name);
            }

            if($taskStatus == "completed")
            {
                $taskfinishDate = new DateTime();
                $taskId->setFinishDate($taskfinishDate);
            }
            else{
                $taskId->setFinishDate(null);
                $taskId->setStatus('pending');
            }

            $taskname = $taskId->setName($name);

            $taskfinishDate = $taskId->setFinishDate(new \DateTime($finishDate));
            $taskDuration = $taskId->setDuration($taskDuration);
            $taskStatus = $taskId->setStatus($taskStatus);
            
            $entityManager->flush();
            
            $response->setContent($taskId->getId());
            return $response;
        }
        catch(Exception $e)
        {
            $response->setContent("0");
        }
        return $response;
    }

    /**
     * @Route("/api/getLastOpenedTask")
     * @Method({"GET"})
     */
    public function getLastOpenedTask()
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $task = $this->getDoctrine()
            ->getRepository(Task::class)
            ->findBy(['status' => 'pending']);

        if (!$task) {
            $response->setContent('null');
            return $response;
        }
        $response->setContent(json_encode($task[0]));
        return $response;
    }
    /**
     * @Route("/api/getAllTasks")
     * @Method({"GET"})
     */
    public function getAllTasks(Connection $connection)
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $allTasks = $connection->fetchAll("SELECT * FROM task t WHERE t.name is NOT NULL AND start_date is NOT NULL");

        if (!$allTasks) {
            $response->setContent('[]');
            return $response;
        }

        $response->setContent(json_encode($allTasks));
        return $response;
    }

    /**
     * @Route("/api/getBySearch")
     * @Method({"GET"})
     */
    public function getBySearch(Request $request,Connection $connection)
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $name = $request->query->get('search');
        $date = $request->query->get('date');

        $allTasks = $connection->fetchAll("SELECT * FROM task t WHERE t.name LIKE '%".$name."%' AND t.start_date LIKE '%".$date."%'");

        if (!$allTasks) {
            $response->setContent('[]');
            return $response;
        }
        $response->setContent(json_encode($allTasks));
        return $response;
    }
    

}